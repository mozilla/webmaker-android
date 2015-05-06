package mozilla.org.webmaker;

import android.app.Activity;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.webkit.JavascriptInterface;
import android.widget.RelativeLayout;

import mozilla.org.webmaker.view.WebmakerWebView;
import org.json.JSONException;
import org.json.JSONObject;

public class WebmakerActivity extends Activity {

    protected WebmakerWebView view;
    protected JSONObject routeParams;
    protected String pageName;
    protected int id, layoutResID, menuResId;

    public WebmakerActivity(String pageName, int id, int layoutResID, int menuResId) {
        this.pageName = pageName;
        this.id = id;
        this.layoutResID = layoutResID;
        this.menuResId = menuResId;
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Extract route information from intent extras
        Bundle intentExtras = getIntent().getExtras();
        routeParams = new JSONObject();
        try {
            routeParams.put("project", intentExtras.get("projectId"));
        } catch (JSONException e) {
            e.printStackTrace();
        }

        // Add webview to layout
        setContentView(layoutResID);
        view = new WebmakerWebView(this, pageName, routeParams);
        RelativeLayout layout = (RelativeLayout) findViewById(id);
        layout.addView(view);
    }

    @Override
    public void onDestroy() {
        Log.v("wm", "onDestroy");
        if (view == null) return;
        view.destroy();
        view = null;
        super.onDestroy();
    }
}
