package org.mozilla.webmaker.activity;

import android.os.Bundle;
import android.view.Window;
import org.mozilla.webmaker.R;
import org.mozilla.webmaker.WebmakerActivity;
import org.mozilla.webmaker.router.Router;

public class Login extends WebmakerActivity {
    public Login() {
        super("login", R.id.login_layout, R.layout.login_layout, R.menu.menu_login);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {

        if (isLoggedIn()) {
            Router.sharedRouter().open("/main");
            finish();
        }

        // No title bar
        this.requestWindowFeature(Window.FEATURE_NO_TITLE);
        super.onCreate(savedInstanceState);
    }

    @Override
    protected void onResume() {
        if (isLoggedIn()) {
            Router.sharedRouter().open("/main");
            finish();
        }
        super.onResume();
    }
}
