package mozilla.org.webmaker.view;

import android.annotation.SuppressLint;
import android.content.Context;
import android.view.ViewGroup;
import android.webkit.WebView;

import mozilla.org.webmaker.client.WebClient;
import mozilla.org.webmaker.javascript.WebAppInterface;

public class WebmakerWebView extends WebView {

    @SuppressLint("SetJavaScriptEnabled")
    public WebmakerWebView(Context context, String pageName) {
        super(context);
        this.setLayoutParams(new ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
        this.getSettings().setJavaScriptEnabled(true);
        this.setWebViewClient(new WebClient());
        this.loadUrl("file:///android_asset/www/pages/" + pageName + "/index.html");
        this.setBackgroundColor(0x00000000);
        this.addJavascriptInterface(new WebAppInterface(context), "Android");
        setWebContentsDebuggingEnabled(true);
    }
}
