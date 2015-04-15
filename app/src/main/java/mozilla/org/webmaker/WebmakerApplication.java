package mozilla.org.webmaker;

import android.app.Application;
import android.util.Log;
import mozilla.org.webmaker.Router;

public class WebmakerApplication extends Application {

    // Singleton
    private static WebmakerApplication singleton;
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
        Router.sharedRouter().map("/map/:projectId", Map.class);
        Router.sharedRouter().map("/project/:projectId", Project.class);
        Router.sharedRouter().map("/project/:projectId/:elementId", Editor.class);
        Router.sharedRouter().map("/project/:projectId/:elementId/:attributeId", Tinker.class);

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
