package mozilla.org.webmaker.activity;

import android.view.Menu;
import android.view.MenuItem;

import org.json.JSONException;

import mozilla.org.webmaker.R;
import mozilla.org.webmaker.WebmakerActivity;
import mozilla.org.webmaker.router.Router;

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
        // Fetch project ID
        String id;
        try {
            id = routeParams.get("project").toString();
        } catch (JSONException e) {
            return super.onOptionsItemSelected(item);
        }

        // Handle button press
        switch (item.getItemId()) {
            case R.id.action_play:
                // @todo
                return true;
            case R.id.action_settings:
                Router.sharedRouter().open("/projects/" + id + "/settings");
                return true;
            case R.id.action_share:
                // @todo
                return true;
            default:
                return super.onOptionsItemSelected(item);
        }
    }
}
