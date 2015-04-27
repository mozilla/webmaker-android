package mozilla.org.webmaker.javascript;

import mozilla.org.webmaker.router.Router;
import android.content.Context;
import android.util.Log;
import android.webkit.JavascriptInterface;
import android.content.SharedPreferences;

import mozilla.org.webmaker.router.Router;

public class WebAppInterface {

    private Context mContext;
    private SharedPreferences mPrefs;
    private String mPrefKey;
    private String mPageState;

    public WebAppInterface(Context c) {
        mContext = c;
        mPrefKey = mContext.getClass().getSimpleName() + "_prefs";
        mPrefs = mContext.getSharedPreferences(mPrefKey, 0);
        mPageState = mPrefs.getString("page_state", "{}");
        Log.v("wm", "getting state " + mPrefKey + ": " + mPageState);
    }

    @JavascriptInterface
    public String getState() {
        return mPrefs.getString("page_state", "{}");
    }

    @JavascriptInterface
    public void setState(String serializedState) {
        SharedPreferences.Editor edit = mPrefs.edit();
        edit.putString("page_state", serializedState);
        edit.commit();
        Log.v("wm", "set state to " + serializedState);
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