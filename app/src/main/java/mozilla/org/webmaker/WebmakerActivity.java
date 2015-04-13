package mozilla.org.webmaker;

import android.app.Activity;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.RelativeLayout;

public class WebmakerActivity extends Activity {

    protected boolean instantiated = false;

    protected WmWebView view;
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
        view = new WmWebView(this, pageName);
        RelativeLayout layout = (RelativeLayout) findViewById(id);
        layout.addView(view);
    }

    @Override
    public void onDestroy() {
        Log.v("wm", "onDestroy");
        if (view != null) {
            view.destroy();
            view = null;
        }
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
     * Handle action bar item clicks here. The action bar will
     * automatically handle clicks on the Home/Up button, so long
     * as you specify a parent activity in AndroidManifest.xml.
     *
     * @param item
     * @return
     */
    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        int id = item.getItemId();
        if (id == R.id.action_settings) {
            return true;
        }
        return super.onOptionsItemSelected(item);
    }
}
