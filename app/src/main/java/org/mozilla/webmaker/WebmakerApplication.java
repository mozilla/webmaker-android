package org.mozilla.webmaker;

import android.app.Application;
import android.content.res.Resources;

import com.google.android.gms.analytics.GoogleAnalytics;
import com.google.android.gms.analytics.Tracker;

import org.mozilla.webmaker.activity.*;
import org.mozilla.webmaker.router.SimpleRouter;

public class WebmakerApplication extends Application {

    private WebmakerApplication singleton;
    private static GoogleAnalytics analytics;
    private static Tracker tracker;

    public WebmakerApplication getInstance() { return singleton; }
    public static GoogleAnalytics getAnalytics() { return analytics; }
    public static Tracker getTracker() { return tracker; }

    @Override
    public void onCreate() {
        super.onCreate();
        singleton = this;
        Resources res = getResources();

        // Dry run allows you to debug Google Analytics locally without sending data to any servers.
        analytics = GoogleAnalytics.getInstance(this);
        analytics.setDryRun(BuildConfig.DEBUG);

        tracker = analytics.newTracker(R.xml.app_tracker);
        tracker.setAppId(res.getString(R.string.ga_appId));
        tracker.setAppName(res.getString(R.string.ga_appName));
        tracker.enableAutoActivityTracking(true);
        tracker.enableExceptionReporting(true);

        SimpleRouter.getSharedRouter().setContext(getApplicationContext());
        SimpleRouter.getSharedRouter().route("/main", MainActivity.class);
        SimpleRouter.getSharedRouter().route("/main/:tab", MainActivity.class);

        SimpleRouter.getSharedRouter().route("/login", Login.class);
        SimpleRouter.getSharedRouter().route("/login/:mode", Login.class);

        SimpleRouter.getSharedRouter().route("/style-guide", StyleGuide.class);

	SimpleRouter.getSharedRouter().route("/users/:user/projects", UserProjects.class);
        SimpleRouter.getSharedRouter().route("/users/:user/projects/:project", Project.class);
        SimpleRouter.getSharedRouter().route("/users/:user/projects/:project/settings", ProjectSettings.class);
        SimpleRouter.getSharedRouter().route("/users/:user/projects/:project/play", Play.class);
        SimpleRouter.getSharedRouter().route("/users/:user/projects/:project/link", Link.class);

        SimpleRouter.getSharedRouter().route("/users/:user/projects/:project/pages/:page", Page.class);
        SimpleRouter.getSharedRouter().route("/users/:user/projects/:project/pages/:page/elements/:element/editor/:editor", Element.class);
        SimpleRouter.getSharedRouter().route("/users/:user/projects/:project/pages/:page/elements/:element/propertyName/:propertyName", Tinker.class);
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
