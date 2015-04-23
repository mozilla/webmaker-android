package mozilla.org.webmaker.javascript;

import android.content.Context;
import android.util.Log;
import android.webkit.JavascriptInterface;

import mozilla.org.webmaker.router.Router;

public class WebAppInterface {

    private Context mContext;

    public WebAppInterface(Context c) {
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