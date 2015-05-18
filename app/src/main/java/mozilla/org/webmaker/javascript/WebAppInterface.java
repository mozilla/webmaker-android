package mozilla.org.webmaker.javascript;

import android.content.Context;
import android.content.SharedPreferences;
import android.util.Log;

import org.json.JSONObject;
import org.xwalk.core.JavascriptInterface;

import mozilla.org.webmaker.router.Router;

public class WebAppInterface {

    protected Context mContext;
    protected SharedPreferences mPrefs;
    protected JSONObject mRoute;
    protected String mPrefKey;
    protected String mPageState;

    public static final String WEBMAKER_PREFS = "WEBMAKER";

    public WebAppInterface(Context context) {
        this(context, null);
    }

    public WebAppInterface(Context context, JSONObject routeParams) {
        mContext = context;
        mPrefKey = "::".concat(mContext.getClass().getSimpleName());
        mPrefs = mContext.getSharedPreferences(mPrefKey, 0);
        mPageState = mPrefs.getString("page_state", "{}");
        mRoute = routeParams;
        Log.v("wm", "getting state " + mPrefKey + ": " + mPageState);
    }

    @JavascriptInterface
    public String getSharedPreferences(String key, boolean scope) {
        SharedPreferences getter = mContext.getSharedPreferences(WEBMAKER_PREFS, 0);
        if (scope) {
            key = key.concat(mPrefKey);
        }
        return getter.getString(key, null);
    }

    @JavascriptInterface
    public void setSharedPreferences(String key, String value, boolean scope) {
        SharedPreferences.Editor editor = mContext.getSharedPreferences(WEBMAKER_PREFS, 0).edit();
        if (scope) {
            key = key.concat(mPrefKey);
        }
        editor.putString(key, value);
        editor.apply();
    }

    @JavascriptInterface
    public String getState() {
        return mPrefs.getString("page_state", "{}");
    }

    @JavascriptInterface
    public void setState(String serializedState) {
        SharedPreferences.Editor edit = mPrefs.edit();
        edit.putString("page_state", serializedState);
        edit.apply();
    }

    @JavascriptInterface
    public void logText(String txt){
        Log.v("wm", txt);
    }

    @JavascriptInterface
    public void setView(String url) {
        Router.sharedRouter().open(url);
    }

    @JavascriptInterface
    public String getRouteParams() {
        if (mRoute == null) {
            return "";
        }

        Log.v("Router", mRoute.toString());
        return mRoute.toString();
    }
}