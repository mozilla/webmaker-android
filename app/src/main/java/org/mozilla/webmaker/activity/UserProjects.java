package org.mozilla.webmaker.activity;

import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;

import org.json.JSONException;

import org.mozilla.webmaker.R;
import org.mozilla.webmaker.WebmakerActivity;
import org.mozilla.webmaker.router.SimpleRouter;
import org.mozilla.webmaker.util.Share;

public class UserProjects extends WebmakerActivity {
    public UserProjects() {
	super("user-projects", R.id.user_projects_layout, R.layout.user_projects_layout, R.menu.menu_user_projects);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
	super.onCreate(savedInstanceState);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
	getMenuInflater().inflate(menuResId, menu);
	return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
	// Fetch User ID
	String userId;
	try {
	    userId = routeParams.get("user").toString();
	} catch (JSONException e) {
	    return super.onOptionsItemSelected(item);
	}

	// Handle button press
	switch (item.getItemId()) {
	    case R.id.action_share:
		SimpleRouter.getSharedRouter().call("/users/" + userId + "/projects/" + id + "/play");
		return true;
	    default:
		return super.onOptionsItemSelected(item);
	}
    }
}
