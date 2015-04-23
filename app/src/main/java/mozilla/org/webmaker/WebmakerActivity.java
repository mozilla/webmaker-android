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
        assert view != null;
        view.destroy();
        view = null;
        super.onDestroy();
    }

    /**
     * Inflate the menu; this adds items to the action bar if it is present.
     */
    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(menuResId, menu);
        return true;
    }

    /**
     * Handle action bar item clicks here. The action bar will automatically handle
     * clicks on the Home/Up button, so long as you specify a parent activity in AndroidManifest.xml
     */
    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        return item.getItemId() == R.id.action_settings;
    }
}
