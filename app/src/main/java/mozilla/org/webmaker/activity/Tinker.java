package mozilla.org.webmaker.activity;

import android.app.ActionBar;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.os.Bundle;
import android.view.Menu;
import android.view.Window;
import android.view.WindowManager;
import android.widget.RelativeLayout;
import mozilla.org.webmaker.R;
import mozilla.org.webmaker.WebmakerActivity;
import mozilla.org.webmaker.view.WebmakerWebView;

public class Tinker extends WebmakerActivity {
    public Tinker() {
        super("tinker", R.id.tinker_layout, R.layout.tinker_layout, R.menu.menu_tinker);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Custom styles
        ActionBar actionBar = getActionBar();
        ColorDrawable colorOne = new ColorDrawable(Color.parseColor("#ff303250"));
        ColorDrawable colorTwo = new ColorDrawable(Color.parseColor("#ff303250"));
        actionBar.setStackedBackgroundDrawable(colorOne);
        actionBar.setBackgroundDrawable(colorTwo);

        Window window = getWindow();
        window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
        window.clearFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
        window.setStatusBarColor(0xff282733);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }
}
