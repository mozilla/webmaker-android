package org.mozilla.webmaker.activity;

import android.annotation.TargetApi;
import android.app.ActionBar;
import android.content.res.Resources;
import android.graphics.drawable.ColorDrawable;
import android.os.Build;
import android.os.Bundle;
import android.view.Window;
import android.view.WindowManager;

import org.mozilla.webmaker.R;
import org.mozilla.webmaker.WebmakerActivity;

public class Tinker extends WebmakerActivity {
    public Tinker() {
        super("tinker", R.id.tinker_layout, R.layout.tinker_layout, R.menu.menu_tinker);
    }

    @Override @TargetApi(Build.VERSION_CODES.LOLLIPOP)
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            // Custom styles
            Resources res = getResources();
            ColorDrawable plum = new ColorDrawable(getResources().getColor(R.color.plum));
            int shadowPlum = res.getColor(R.color.shadow_plum);

            ActionBar actionBar = getActionBar();
            if (actionBar != null) actionBar.setBackgroundDrawable(plum);

            Window window = getWindow();
            window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
            window.clearFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
            window.setStatusBarColor(shadowPlum);
        }
    }
}
