package org.mozilla.webmaker.router;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;

import org.mozilla.webmaker.router.exception.RouteNotFoundException;
import org.mozilla.webmaker.router.object.Route;
import org.mozilla.webmaker.router.util.RouteCallback;

import java.util.HashMap;
import java.util.Map;
/*
 * This file is part of SimpleRouter, licensed under the MIT License (MIT).
 *
 * Copyright (c) 2015 Ryan W
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
public class SimpleRouter {

    /**
     * sharedRouter is a global statically defined instance of SimpleRouter, standard usage.
     * predefinedRoutes are routes defined by {@link #route} methods, that don't contain parameters.
     * {@link Context} is required in order to launch new activities via {@link Intent}s.
     */
    private static final SimpleRouter sharedRouter = new SimpleRouter();
    private final Map<String, Route> predefinedRoutes = new HashMap<>();
    private final Map<String, Route> cachedRoutes = new HashMap<>();
    private Context context;

    /**
     * Routes a URL to a callback function code block, with code to be executed when the URL is called.
     * @param routeUrl The URL to route to the callback function code block.
     * @param routeCallback The code block to execute when the URL is called.
     */
    public void route(String routeUrl, RouteCallback<Route> routeCallback) {
        this.route(routeUrl, null, routeCallback);
    }

    /**
     * Routes a URL to a Android {@link Activity} to be opened when the URL is called.
     * @param routeUrl The URL to route to the Android {@link Activity}.
     * @param targetClass The Android {@link Activity} to open when the URL is called.
     */
    public void route(String routeUrl, Class<? extends Activity> targetClass) {
        this.route(routeUrl, targetClass, null);
    }

    /**
     * Routes a URL to a callback function code block and to a Android {@link Activity} to be opened when the URL is called.
     * @param routeUrl The URL to route to the callback function code block and Android {@link Activity}.
     * @param targetClass The Android {@link Activity} to open when the URL is called.
     * @param routeCallback THe code block to execute when the URL is called.
     */
    public void route(String routeUrl, Class<? extends Activity> targetClass, RouteCallback<Route> routeCallback) {
        String cleanedRouteUrl = cleanUrl(routeUrl);
        Route route = new Route(cleanedRouteUrl);
        if (targetClass != null) route.setTargetClass(targetClass);
        if (routeCallback != null) route.setCallback(routeCallback);
        predefinedRoutes.put(cleanedRouteUrl, route);
    }

    /**
     * Calls a route URL with the parameters embedded; example "/user/ryanw-se/project/1".
     * @param url The URL to call and identify with the router.
     */
    public void call(String url) {
        this.call(url, null);
    }

    /**
     * Calls a route URL with the parameters embedded; example "/user/ryanw-se/project/1".
     * @param url The URL to call and identify with the router.
     * @param extras Additional parameters to pass along with the URL parameters.
     */
    public void call(String url, Bundle extras) {
        String cleanedUrl = cleanUrl(url);
        Route route = cachedRoutes.get(cleanedUrl);

        if (route == null) route = determineRoute(cleanedUrl);
        if (route.getCallback() != null) route.getCallback().call(route);

        if (route.getTargetClass() != null) {
            if (context == null) throw new NullPointerException("In order to start activities, you need to provide the router with context.");
            Intent intent = new Intent();
            intent.putExtras(route.getParameters());
            if (extras != null) intent.putExtras(extras);
            intent.setClass(context, route.getTargetClass());
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            context.startActivity(intent);
        }

        if (cachedRoutes.get(cleanedUrl) == null) cachedRoutes.put(cleanedUrl, route);
    }

    /**
     * Calls an external URL without parameters, typically used for simple things like "https://www.youtube.com/watch?v=8To-6VIJZRE".
     * @param url The external URL to launch in a new activity.
     */
    public void callExt(String url) {
        this.callExt(url, null);
    }

    /**
     * Calls an external URL with parameters, typically used for passing additional information, along with a simple external URL.
     * @param url The external URL to launch in a new {@link Activity}.
     * @param parameters The extra parameters to pass along in the new {@link Activity}.
     */
    public void callExt(String url, Bundle parameters) {
        if (context == null) throw new NullPointerException("In order to start activities, you need to provide the router with context.");
        Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        if (parameters != null) intent.putExtras(parameters);
        context.startActivity(intent);
    }

    /**
     * Gets a list of all predefined routes, using the {@link #route} methods.
     * @return List of predefined {@link Route}s without parameters.
     */
    public Map<String, Route> getPredefinedRoutes() {
        return predefinedRoutes;
    }

    /**
     * Gets a global statically defined router, accessible from everywhere within the project.
     * @return Global statically defined instance of this router.
     */
    public static SimpleRouter getSharedRouter() {
        return sharedRouter;
    }

    /**
     * Sets the {@link Context} to be used when using {@link Intent}s to launch new {@link Activity}s.
     * @param context The {@link Context} to be used when launching new {@link Activity}s via {@link Intent}s.
     */
    public void setContext(Context context) {
        this.context = context;
    }

    /**
     * Gets the {@link Context} to be used when using {@link Intent}s to launch new {@link Activity}s.
     * @return The {@link Context} to be used when launching new {@link Activity}s via {@link Intent}s.
     */
    public Context getContext() {
        return context;
    }

    /**
     * Takes a URL, determines what route it falls under and creates a new {@link Route} instance using that information.
     * @param url The URL with payload data we want to check the predefined routes for.
     * @return New {@link Route} object with parameters bundle.
     */
    private Route determineRoute(String url) {
        String[] urlSegments = cleanUrl(url).split("/");
        for (Map.Entry<String, Route> routeEntry : predefinedRoutes.entrySet()) {
            String[] routeUrlSegments = routeEntry.getKey().split("/");
            if (routeUrlSegments.length != urlSegments.length) continue;
            Bundle routeParams = createParamBundle(urlSegments, routeUrlSegments);
            if (routeParams == null) continue;

            Route route = new Route(routeEntry.getKey());
            if (routeEntry.getValue().getCallback() != null) route.setCallback(routeEntry.getValue().getCallback());
            if (routeEntry.getValue().getTargetClass() != null) route.setTargetClass(routeEntry.getValue().getTargetClass());
            route.setParameters(routeParams);
            return route;

        }
        throw new RouteNotFoundException("Route not found for the url " + url);
    }

    /**
     * Checks each of the segments in the URL, compares them and puts the payload in a {@link Bundle} with the :variable.
     * @param urlSegments The routed URL with the payload embedded; example "/users/ryanw-se/projects/10".
     * @param routeUrlSegments The route URL with variables embedded; example "/users/:userId/projects/:projectId".
     * @return {@link Bundle} with the payloads assigned to their route variables.
     */
    private Bundle createParamBundle(String[] urlSegments, String[] routeUrlSegments) {
        Bundle routeParams = new Bundle();
        for (int i = 0; i < routeUrlSegments.length; i++) {
            String routeUrlSegment = routeUrlSegments[i];
            String urlSegment = urlSegments[i];

            if (routeUrlSegment.charAt(0) == ':') {
                routeParams.putString(routeUrlSegment.substring(1, routeUrlSegment.length()), urlSegment);
                continue;
            }

            if (!routeUrlSegment.equalsIgnoreCase(urlSegment)) return null;
        }
        return routeParams;
    }

    /**
     * Removes the starting forward slash from the URL.
     */
    private String cleanUrl(String routeUrl) {
        if (routeUrl.startsWith("/")) return routeUrl.substring(1, routeUrl.length());
        return routeUrl;
    }
}