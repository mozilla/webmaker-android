package mozilla.org.webmaker;

import android.app.Application;
import android.content.res.Resources;
import android.util.Log;

import com.google.android.gms.analytics.GoogleAnalytics;
import com.google.android.gms.analytics.Tracker;

import mozilla.org.webmaker.activity.Element;
import mozilla.org.webmaker.activity.Project;
import mozilla.org.webmaker.activity.Page;
import mozilla.org.webmaker.activity.Tinker;
import mozilla.org.webmaker.router.Router;

public class WebmakerApplication extends Application {

    // Singleton
    private WebmakerApplication singleton;
    public WebmakerApplication getInstance(){
        return singleton;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        singleton = this;
        Resources res = getResources();
        Log.v("[Webmaker]", "Application created.");

        // Dry run allows you to debug Google Analytics locally without sending data to any servers.
        GoogleAnalytics analytics = GoogleAnalytics.getInstance(this);
        analytics.setDryRun(false);

        Tracker tracker = analytics.newTracker(R.xml.app_tracker);
        tracker.setAppId(res.getString(R.string.ga_appId));
        tracker.setAppName(res.getString(R.string.ga_appName));
        tracker.enableAutoActivityTracking(true);
        tracker.enableExceptionReporting(true);


        // Router
        Router.sharedRouter().setContext(getApplicationContext());
        Router.sharedRouter().map("/main", MainActivity.class);
        Router.sharedRouter().map("/main/:tab", MainActivity.class);
        Router.sharedRouter().map("/projects/:project", Project.class);
        Router.sharedRouter().map("/projects/:project/pages/:page", Page.class);
        Router.sharedRouter().map("/projects/:project/pages/:page/elements/:element/editor/:editor", Element.class);
        Router.sharedRouter().map("/projects/:project/pages/:page/elements/:element/attributes/:attribute/editor/:editor", Tinker.class);

        // @todo Restore state
    }

    @Override
    public void onLowMemory() {
        super.onLowMemory();
    }

    @Override
    public void onTerminate() {
        super.onTerminate();
    }
}
