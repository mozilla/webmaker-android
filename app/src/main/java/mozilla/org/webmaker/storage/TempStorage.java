package mozilla.org.webmaker.storage;

import android.app.ActivityManager;
import android.content.Context;
import android.util.LruCache;

public class TempStorage {

    private Context context;
    private static int cacheSize;
    private static final Cache cache = new Cache(cacheSize);

    /**
     * Wrapper class constructor that gets the context for determining the size of the cache.
     */
    public TempStorage(Context context) {
        this.context = context;
        cacheSize = determineSize();
    }

    /**
     * A globally accessible instance of the cache that can be accessed anywhere.
     */
    public static Cache getCache() {
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
    private static class Cache extends LruCache {
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
