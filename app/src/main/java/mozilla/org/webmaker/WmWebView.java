package mozilla.org.webmaker;

import android.webkit.WebView;
import android.content.Context;
import android.view.ViewGroup;

public class WmWebView extends WebView {
    public WmWebView(Context context, String pageName) {
        super(context);
        this.setLayoutParams(new ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
        this.getSettings().setJavaScriptEnabled(true);
        this.setWebViewClient(new WebClient());
        this.loadUrl("file:///android_asset/www/pages/" + pageName + "/index.html");
        this.setBackgroundColor(0x00000000);
        this.addJavascriptInterface(new WebAppInterface(context), "Android");
        this.setWebContentsDebuggingEnabled(true);
    }
}
