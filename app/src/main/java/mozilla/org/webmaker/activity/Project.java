package mozilla.org.webmaker.activity;

import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.RelativeLayout;
import mozilla.org.webmaker.R;
import mozilla.org.webmaker.WebmakerActivity;
import mozilla.org.webmaker.view.WebmakerWebView;

public class Project extends WebmakerActivity {
    public Project() {
        super("project", R.id.project_layout, R.layout.project_layout, R.menu.menu_project);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(menuResId, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        return item.getItemId() == R.id.action_settings;
    }
}
