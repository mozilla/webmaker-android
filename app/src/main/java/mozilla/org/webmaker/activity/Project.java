package mozilla.org.webmaker.activity;

import android.view.Menu;
import android.view.MenuItem;

import mozilla.org.webmaker.R;
import mozilla.org.webmaker.WebmakerActivity;

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
