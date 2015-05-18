package mozilla.org.webmaker;

import android.app.Activity;
import android.os.Bundle;
import android.view.MenuItem;
import android.widget.RelativeLayout;

import org.json.JSONException;
import org.json.JSONObject;

import mozilla.org.webmaker.view.WebmakerWebView;

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

    /**
     * Extracts route information from intent extras & Adds {@link mozilla.org.webmaker.view.WebmakerWebView} to layout.
     */
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        routeParams = new JSONObject();

        Bundle intentExtras = getIntent().getExtras();
        if (intentExtras != null) {
            try {
                routeParams.put("project", intentExtras.get("project"));
                routeParams.put("page", intentExtras.get("page"));
                routeParams.put("element", intentExtras.get("element"));
                routeParams.put("attribute", intentExtras.get("attribute"));
                routeParams.put("editor", intentExtras.get("editor"));
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }

        setContentView(layoutResID);
        view = new WebmakerWebView(this, this, pageName, routeParams);
        RelativeLayout layout = (RelativeLayout) findViewById(id);
        layout.addView(view);

        super.onCreate(savedInstanceState);
    }

    @Override
    protected void onResume() {
        view.load("javascript: window.jsComm && window.jsComm('onResume')", null);
        super.onResume();
    }
    @Override
    protected void onPause() {
        view.load("javascript: window.jsComm && window.jsComm('onPause')", null);
        super.onPause();
    }


    @Override
    public void onDestroy() {
        if (view != null) {
            view.onDestroy();
            view = null;
        }
        super.onDestroy();
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch(item.getItemId()) {
            case android.R.id.home:
                onBackPressed();
                return true;
        }
        return super.onOptionsItemSelected(item);
    }
}
