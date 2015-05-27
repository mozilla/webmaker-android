package mozilla.org.webmaker.javascript;

import android.app.Activity;
import android.content.Context;
import android.content.SharedPreferences;
import android.os.Build;
import android.util.Log;

import mozilla.org.webmaker.BuildConfig;
import org.json.JSONObject;
import org.xwalk.core.JavascriptInterface;

import mozilla.org.webmaker.BaseActivity;
import mozilla.org.webmaker.activity.Element;
import mozilla.org.webmaker.router.Router;
import mozilla.org.webmaker.storage.MemStorage;

public class WebAppInterface {

    protected Context mContext;
    protected BaseActivity mActivity;
    protected SharedPreferences mPrefs;
    protected JSONObject mRoute;
    protected String mPrefKey;
    protected String mPageState;

    public static final String SHARED_PREFIX = "prefs::".concat(BuildConfig.VERSION_NAME);
    public static final String ROUTE_KEY = "route::data";

    public WebAppInterface(Context context) {
        this(context, null);
    }

    public WebAppInterface(Context context, JSONObject routeParams) {
        mContext = context;
        mActivity = (BaseActivity) context;
        mPrefKey = "::".concat(mContext.getClass().getSimpleName());
        mPrefs = mContext.getSharedPreferences(mPrefKey, 0);
        mRoute = routeParams;
        Log.v("wm", "getting state " + mPrefKey + ": " + mPageState);
    }

    /**
     * ---------------------------------------
     * Disk-based Storage
     * ---------------------------------------
     */

    @JavascriptInterface
    public String getSharedPreferences(String key) {
        return getSharedPreferences(key, true);
    }

    @JavascriptInterface
    public String getSharedPreferences(String key, final boolean scope) {
        SharedPreferences getter = mContext.getSharedPreferences(SHARED_PREFIX, 0);
        if (scope) key = key.concat(mPrefKey);
        return getter.getString(key, null);
    }

    @JavascriptInterface
    public void setSharedPreferences(String key, final String value) {
        setSharedPreferences(key, value, true);
    }

    @JavascriptInterface
    public void setSharedPreferences(String key, final String value, final boolean scope) {
        SharedPreferences.Editor editor = mContext.getSharedPreferences(SHARED_PREFIX, 0).edit();
        if (scope) key = key.concat(mPrefKey);
        editor.putString(key, value);
        editor.apply();
    }

    /**
     * ---------------------------------------
     * Memory-based Storage
     * ---------------------------------------
     */

    @JavascriptInterface
    public String getMemStorage (String key) {
        return getMemStorage(key, true);
    }

    @JavascriptInterface
    public String getMemStorage (String key, final boolean scope) {
        if (scope) key = key.concat(mPrefKey);
        return MemStorage.sharedStorage().get(key);
    }

    @JavascriptInterface
    public void setMemStorage (String key, final String value) {
        setMemStorage(key, value, true);
    }

    @JavascriptInterface
    public void setMemStorage (String key, final String value, final boolean scope) {
        if (scope) key = key.concat(mPrefKey);
        MemStorage.sharedStorage().put(key, value);
    }

    /**
     * ---------------------------------------
     * Camera
     * ---------------------------------------
     */
    @JavascriptInterface
    public void getFromCamera() {
        Element elementActivity = (Element) mContext;
        if (elementActivity != null) {
            elementActivity.dispatchCameraIntent();
        }
    }

    @JavascriptInterface
    public void getFromMedia() {
        Element elementActivity = (Element) mContext;
        if (elementActivity != null) {
            elementActivity.dispatchMediaIntent();
        }
    }

    /**
     * ---------------------------------------
     * Back Button
     * ---------------------------------------
     */

    @JavascriptInterface
    public void goBack() {
        mActivity.runOnUiThread(new Runnable() {
            public void run() {
                mActivity.goBack();
            }
        });
    }

    /**
     * ---------------------------------------
     * Router
     * ---------------------------------------
     */

    @JavascriptInterface
    public void setView(final String url) {
        setView(url, null);
    }

    @JavascriptInterface
    public void setView(final String url, final String routeData) {
        Activity activity = (Activity) mContext;
        if (activity == null) return;

        if (routeData != null) {
            MemStorage.sharedStorage().put(ROUTE_KEY, routeData);
        }

        activity.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                Router.sharedRouter().open(url);
            }
        });
    }

    /**
     * ---------------------------------------
     * Router Bindings
     * ---------------------------------------
     */

    @JavascriptInterface
    public String getRouteParams() {
        if (mRoute == null) return "";
        return mRoute.toString();
    }

    @JavascriptInterface
    public String getRouteData() {
        return MemStorage.sharedStorage().get(ROUTE_KEY);
    }
}