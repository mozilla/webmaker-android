package mozilla.org.webmaker.view;

import android.annotation.SuppressLint;
import android.content.Context;
import android.view.View;
import android.view.ViewGroup;
import android.view.animation.AlphaAnimation;
import android.view.animation.Animation;
import android.view.animation.DecelerateInterpolator;
import android.webkit.WebView;

import android.webkit.JsPromptResult;
import android.webkit.WebChromeClient;
import mozilla.org.webmaker.javascript.WebAppInterface;
import org.json.JSONObject;

public class WebmakerWebView extends WebView {

    public WebmakerWebView(Context context, String pageName) {
        this(context, pageName, null);
    }

    @SuppressLint("SetJavaScriptEnabled")
    public WebmakerWebView(Context context, String pageName, JSONObject routeParams) {
        super(context);
        this.setLayoutParams(new ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
        this.getSettings().setJavaScriptEnabled(true);
        this.setWebChromeClient(new WebChromeClient() {
            private void animate(WebView view) {
                Animation fadeIn = new AlphaAnimation(0, 1);
                fadeIn.setInterpolator(new DecelerateInterpolator());
                fadeIn.setDuration(1000);
                view.startAnimation(fadeIn);
            }
            @Override
            public boolean onJsPrompt(WebView view, String url, String message, String defaultValue, JsPromptResult result) {
                return super.onJsPrompt(view, url, message, defaultValue, result);
            }
            @Override
            public void onProgressChanged(WebView view, int newProgress) {
                if (newProgress == 0) {
                    view.setVisibility(View.GONE);
                }
                if (newProgress == 100) {
                    animate(view);
                    view.setVisibility(View.VISIBLE);
                }
                super.onProgressChanged(view, newProgress);
            }
        });
        this.loadUrl("file:///android_asset/www/pages/" + pageName + "/index.html");
        this.setBackgroundColor(0x00000000);
        this.addJavascriptInterface(new WebAppInterface(context, routeParams), "Android");
        setWebContentsDebuggingEnabled(true);
    }
}
