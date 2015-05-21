package mozilla.org.webmaker.storage;

import android.app.ActivityManager;
import android.content.Context;
import android.util.LruCache;

public class MemStorage {

    private static Context context;
    private static int cacheSize = 5 * 1024 * 2014;
    private static final Cache cache = new Cache(cacheSize);
    private static final MemStorage storage = new MemStorage();

    /**
     * Wrapper class constructor that determines the size of the cache.
     * If a constructor isn't provided, the default is 5 MB.
     */
    public MemStorage() {
        if (context != null) cacheSize = determineSize();
    }

    /**
     * Sets the context to be used by this class to determine the size of the cache.
     */
    public void setContext(Context context) {
        MemStorage.context = context;
    }

    /**
     * Gets the context used by this class to determine the size of the cache.
     */
    public Context getContext() {
        return context;
    }

    /**
     * A globally accessible instance of this class, that can be accessed anywhere.
     */
    public static MemStorage getMemStorage() {
        return storage;
    }

    /**
     * A globally accessible instance of this cache, that can be accessed anywhere.
     */
    public static Cache sharedCache() {
        return cache;
    }

    /**
     * Determines the size of the cache for use in creating the cache.
     */
    private int determineSize() {
        int memClass = ( (ActivityManager ) context.getSystemService( Context.ACTIVITY_SERVICE)).getMemoryClass();
        return 1024 * 1024 * memClass / 8;
    }

    /**
     * The actual cache class that is being wrapped around and provided with the maxSize.
     */
    public static class Cache extends LruCache {
        /**
         * @param maxSize for caches that do not override {@link #sizeOf}, this is
         * the maximum number of entries in the cache. For all other caches,
         * this is the maximum sum of the sizes of the entries in this cache.
         */
        public Cache(int maxSize) {
            super(maxSize);
        }
    }
}
