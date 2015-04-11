package mozilla.org.webmaker;

import android.util.Log;
import android.view.View;
import android.view.animation.AlphaAnimation;
import android.view.animation.Animation;
import android.view.animation.DecelerateInterpolator;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;
import android.content.Context;
import android.webkit.WebViewClient;
import android.view.ViewGroup;

public class WmWebView {

    public WebView mWebView;

    public WmWebView(Context context, String pageName) {
        mWebView = new WebView(context);
        mWebView.setLayoutParams(new ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));

        mWebView.getSettings().setJavaScriptEnabled(true);
        mWebView.setWebViewClient(new WebClient());
        mWebView.loadUrl("file:///android_asset/www/pages/" + pageName + "/index.html");
        mWebView.setBackgroundColor(0x00000000);
        mWebView.addJavascriptInterface(new WebAppInterface(context), "Android");
        mWebView.setWebContentsDebuggingEnabled(true);

    }

    public void destroy () {
        mWebView.destroy();
    }

    public class WebAppInterface {
        Context mContext;

        WebAppInterface(Context c) {
            mContext = c;
        }

        @JavascriptInterface
        public void logText(String txt){
            Log.v("wm", txt);
        }

        @JavascriptInterface
        public void setView(String url) {
            Router.sharedRouter().open(url);
        }
    }

    private void animate(final WebView view) {
        Animation fadeIn = new AlphaAnimation(0, 1);
        fadeIn.setInterpolator(new DecelerateInterpolator()); //add this
        fadeIn.setDuration(1000);
        view.startAnimation(fadeIn);
    }

    private class WebClient extends WebViewClient {

        @Override
        public boolean shouldOverrideUrlLoading(WebView view, String url) {
            view.setVisibility(View.GONE);
            return false;
        }

        @Override
        public void onPageFinished(WebView view, String url) {
            animate(view);
            view.setVisibility(View.VISIBLE);
            super.onPageFinished(view, url);
        }

    }

}
