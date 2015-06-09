package org.mozilla.webmaker.activity;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import org.json.JSONException;
import org.mozilla.webmaker.R;
import org.mozilla.webmaker.WebmakerActivity;
import org.mozilla.webmaker.router.Router;
import org.mozilla.webmaker.util.Share;

public class Play extends WebmakerActivity {
    public Play() {
        super("project", R.id.page_layout, R.layout.page_layout, R.menu.menu_play);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Set "mode" in route params
        try {
            routeParams.put("mode", "play");
        } catch (JSONException e) {
            // do nothing
        }

        // Get data from deep link (if available)
        Intent intent = getIntent();
        Uri data = intent.getData();

        // Set route params if valid deep link
        if (data == null) return;
        final String user = data.getQueryParameter("user");
        final String project = data.getQueryParameter("project");
        if (user == null || project == null) return;
        try {
            routeParams.put("user", user);
            routeParams.put("project", project);
        } catch (JSONException e) {
            // do nothing
        }
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
        String userId;
        try {
            id = routeParams.get("project").toString();
            userId = routeParams.get("user").toString();
        } catch (JSONException e) {
            return super.onOptionsItemSelected(item);
        }

        // Handle button press
        switch (item.getItemId()) {
            case R.id.action_share:
                final String url = getString(R.string.share_url) + "/users/" + userId + "/projects/" + id;
                Share.launchShareIntent(url, this);
                return true;
            case R.id.action_remix:
                view.load("javascript: window.createRemix && window.createRemix()", null);
                return true;
            default:
                return super.onOptionsItemSelected(item);
        }
    }
}
