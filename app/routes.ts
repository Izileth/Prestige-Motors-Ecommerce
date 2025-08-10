import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/index.tsx"),
    
    route("about", "routes/about/us/us.tsx"),

    route("about/bmw", "routes/about/brands/bmw.tsx"),
    route("about/porshe", "routes/about/brands/porshe.tsx"),
    route("about/ferrari", "routes/about/brands/ferrari.tsx"),
    route("about/lamborghini", "routes/about/brands/lamborgnhi.tsx"),
    route("about/toyota", "routes/about/brands/toyota.tsx"),
    route("about/amg", "routes/about/brands/amg.tsx"),

    route("history", "routes/about/mission/mission.tsx"),

    
    route("newsletter", "routes/newsletter/newsletter.tsx"),

    route("polities/cookies", "routes/policy/cookies/cookies.tsx"),
    route("polities/privacy", "routes/policy/privacy/privacy.tsx"),
    route("polities/conditions", "routes/policy/terms/terms.tsx"),
        
    route("destacts", "routes/destacts/destacts.tsx"),

    route("login", "routes/auth/login/login.tsx"),
    route("register", "routes/auth/register/register.tsx"),

    route("passwords/forgots", "routes/password/forgots/forgots.tsx"),
    
    route("passwords/reset/:token", "routes/password/reset/reset.tsx"),

    
    route("dashboard", "routes/user/dashboard.tsx"),
    route("vehicles/user", "routes/vehicle/user/list.tsx"),

    route("vehicles", "routes/vehicle/vehicle.tsx"),
    route("vehicles/:slug", "routes/vehicle/id/id.tsx"),
    route("vehicles/create", "routes/vehicle/create/create.tsx"),
    route("vehicles/edit/:id", "routes/vehicle/edit/edit.tsx"),
    
    route("vehicles/category", "routes/vehicle/category/category.tsx"),
    
    route("vehicles/negotiations", "routes/vehicle/negociation/negociation.tsx"),
    route("vehicles/negotiations/:id", "routes/vehicle/negociation/id.tsx"),

    route("sale/dashboard", "routes/sale/dashboard.tsx"),
    route("sale/details/:saleId", "routes/sale/id.tsx"),



] satisfies RouteConfig;
