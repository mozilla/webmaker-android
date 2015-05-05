package mozilla.org.webmaker;

import android.app.Activity;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.RelativeLayout;

import mozilla.org.webmaker.view.WebmakerWebView;

public class WebmakerActivity extends Activity {

    protected WebmakerWebView view;
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
        setContentView(layoutResID);
        view = new WebmakerWebView(this, pageName);
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
