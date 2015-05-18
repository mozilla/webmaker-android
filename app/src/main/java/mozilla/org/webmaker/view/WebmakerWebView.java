package mozilla.org.webmaker.view;

import android.app.Activity;
import android.content.Context;
import android.view.ViewGroup;

import org.json.JSONObject;
import org.xwalk.core.XWalkView;

import mozilla.org.webmaker.R;
import mozilla.org.webmaker.client.WebClient;
import mozilla.org.webmaker.javascript.WebAppInterface;

public class WebmakerWebView extends XWalkView {

    public WebmakerWebView(Context context, Activity activity, String pageName) {
        this(context, activity, pageName, null);
    }

    public WebmakerWebView(Context context, Activity activity, String pageName, JSONObject routeParams) {
        super(context, activity);
        this.setLayoutParams(new ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
        this.load("file:///android_asset/www/pages/" + pageName + "/index.html", null);
        this.setResourceClient(new WebClient(this));
        this.setBackgroundColor(getResources().getColor(R.color.light_gray));
        this.addJavascriptInterface(new WebAppInterface(context, routeParams), "Android");
    }
}
