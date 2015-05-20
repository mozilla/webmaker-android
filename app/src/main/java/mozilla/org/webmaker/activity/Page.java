package mozilla.org.webmaker.activity;

import mozilla.org.webmaker.R;
import mozilla.org.webmaker.WebmakerActivity;

public class Page extends WebmakerActivity {
    public Page() {
        super("page", R.id.page_layout, R.layout.page_layout, R.menu.menu_page);
    }

    @Override
    public void onBackPressed() {
        view.load("javascript: window.jsComm && window.jsComm('onBackPressed')", null);
    }
}
