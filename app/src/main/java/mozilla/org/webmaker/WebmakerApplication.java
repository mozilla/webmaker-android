package mozilla.org.webmaker;

import android.app.Application;
import android.util.Log;

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

        Log.v("[Webmaker]", "Application created.");

        // @todo Google Analytics

        // Router
        Router.sharedRouter().setContext(getApplicationContext());
        Router.sharedRouter().map("/main", MainActivity.class);
        Router.sharedRouter().map("/main/:tab", MainActivity.class);
        Router.sharedRouter().map("/map/:projectId", Project.class);
        Router.sharedRouter().map("/projects/:projectId", Page.class);
        Router.sharedRouter().map("/projects/:projectId/elements/:elementId", Element.class);
        Router.sharedRouter().map("/projects/:projectId/elements/:elementId/:attributeId", Tinker.class);

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
