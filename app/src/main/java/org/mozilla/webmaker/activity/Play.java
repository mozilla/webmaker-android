package org.mozilla.webmaker.activity;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import org.json.JSONException;
import org.mozilla.webmaker.R;
import org.mozilla.webmaker.WebmakerActivity;

public class Play extends WebmakerActivity {
    public Play() {
        super("project", R.id.page_layout, R.layout.page_layout, R.menu.menu_page);
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
}
