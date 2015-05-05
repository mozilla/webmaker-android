package mozilla.org.webmaker.activity;

import android.view.Menu;
import android.view.MenuItem;
import mozilla.org.webmaker.R;
import mozilla.org.webmaker.WebmakerActivity;

public class Map extends WebmakerActivity {
    public Map() {
        super("map", R.id.map_layout, R.layout.map_layout, R.menu.menu_map);
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

