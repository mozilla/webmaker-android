package mozilla.org.webmaker.util;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.Environment;
import android.util.Base64;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

public class Image {

    /**
     * Returns a scaled bitmap from the specified file path.
     *
     * @param path Filepath for bitmap
     * @param reqWidth Maximum width
     * @param reqHeight Maximum height
     * @return Scaled bitmap
     */
    public static Bitmap decodeBitmapFromFile(String path, int reqWidth, int reqHeight) {
        //First decode with inJustDecodeBounds=true to check dimensions
        final BitmapFactory.Options options = new BitmapFactory.Options();
        options.inJustDecodeBounds = true;
        BitmapFactory.decodeFile(path, options);

        // Calculate inSampleSize, raw height and width of image
        final int height = options.outHeight;
        final int width = options.outWidth;
        options.inPreferredConfig = Bitmap.Config.RGB_565;
        int inSampleSize = 1;

        if (height > reqHeight) {
            inSampleSize = Math.round((float) height / (float) reqHeight);
        }

        int expectedWidth = width / inSampleSize;
        if (expectedWidth > reqWidth) {
            inSampleSize = Math.round((float) width / (float) reqWidth);
        }

        // Decode bitmap with inSampleSize set & return
        options.inSampleSize = inSampleSize;
        options.inJustDecodeBounds = false;
        return BitmapFactory.decodeFile(path, options);
    }

    /**
     * Creates a data URI (RFC 2397) from a provided bitmap.
     *
     * @param bitmap Bitmap to be converted into a datauri
     * @param quality JPEG quality (0-100) for the resulting compressed bitmap
     * @return Data URI
     */
    public static String createDataUriFromBitmap(Bitmap bitmap, int quality) {
        String data = convertBitmapToBase64(bitmap, quality);
        return "data:image/jpg;base64,".concat(data);
    }

    /**
     * Create a JPG file within the local filesystem.
     *
     * @param context Context from current activity
     * @return File (filepath)
     * @throws IOException
     */
    public static File createImageFile(Context context) throws IOException {
        String timeStamp = new SimpleDateFormat("yyyyMMdd_HHmmss", Locale.US).format(new Date());
        String imageFileName = "JPEG_" + timeStamp + "_";
        File storageDir = context.getExternalFilesDir(null);
        File image = File.createTempFile(imageFileName, ".jpg", storageDir);
        return image;
    }

    /**
     * ---------------------------------
     * Local methods
     * ---------------------------------
     */

    /**
     * Converts a bitmap to a base64 string.
     *
     * @param image Bitmap to be converted
     * @param quality JPEG quality (0-100) for the resulting compressed bitmap
     * @return Base64 encoded string
     */
    protected static String convertBitmapToBase64(Bitmap image, int quality) {
        ByteArrayOutputStream stream = new ByteArrayOutputStream();
        image.compress(Bitmap.CompressFormat.JPEG, quality, stream);
        byte[] b = stream.toByteArray();
        return Base64.encodeToString(b, Base64.DEFAULT);
    }

}
