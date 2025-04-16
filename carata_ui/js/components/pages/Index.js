class IndexPage extends OpenScript.Component {
    // async mount() {
    //     await super.mount();
    //     req("Widgets.Check");
    //     req("Widgets.Header");
    //     req("Widgets.Task");
    //     req("Forms.AddTaskForm");
    // }

    render(...args) {
        return h.div(
            {
                class: "fixed-top bottom-0 onboarding-screen",
                style: "background: linear-gradient(330deg, #c69ac1, var(--bs-white));"
            },
            h.div(
                { class: "wrapper col-md-7 col-lg-6 col-xl-5 col-xxl-4 mx-auto p-md-3 p-lg-4 p-xl-5 h-100" },
                h.OnboardingCarousel()
            ),
            ...args
        );
    }
}

class OnboardingCarousel extends OpenScript.Component {
    isCycling = state(true); // Set according to whether the carousel autoplays on load or not

    render(...args) {
        return h.div(
            {
                id: "onboardingCarousel",
                class: "carousel carousel-fade slide h-100",
                data_bs_keyboard: "false", // react to keyboard events
                data_bs_ride: "carousel", // autoplay the carousel on load
                data_bs_touch: "false", // disable left/right swipe interactions
                data_bs_pause: "false" // continue the cycling of the carousel on mouseenter
            },
            h.div(
                { class: "carousel-inner h-100" },
                h.OnboardingCarouselItem(
                    "Welcome to Carata",
                    "Order anything around you, even errands!",
                    { class: "active" }
                ),
                h.OnboardingCarouselItem(
                    "Infinite Items, Infinite Places",
                    "Kibandas | Malls | Hotels | Pharmacies | and more, even Errands!"
                ),
                h.OnboardingCarouselItem(
                    "You deserve convenience",
                    "Carata delivers convenience!"
                )
            ),
            h.div(
                {
                    class: "carousel-gif position-absolute start-0 top-0 end-0 z-1 p-3 d-grid align-items-end",
                    style: "background: linear-gradient(to bottom, var(--bs-primary-bg-subtle), var(--bs-white) 85%);"
                },
                h.div(
                    { class: "d-flex justify-content-center" },
                    h.div(
                        { class: "flex-shrink-0 flex-grow-0" },
                        h.img({
                            class: "rounded-circle",
                            width: "200",
                            height: "200",
                            src: "../../../../assets/images/hello-1.gif",
                            alt: "Onboarding GIF"
                        })
                    )
                ),
                h.div(
                    { class: "carousel-pause position-absolute top-0 end-0 p-2" },
                    h.button(
                        {
                            onclick: this.method("togglePlayPause"),
                            class: "",
                            title: "Play or Pause Carousel"
                        },
                        v(this.isCycling, (isCycling) => {
                            if (isCycling.value) return h.i({ class: "fa-solid fa-pause" });
                            return h.i({ class: "fa-solid fa-play" });
                        })
                    )
                )
            ),
            h.div(
                { class: "carousel-controls position-absolute start-0 end-0 bottom-0 z-1 p-3 d-grid align-items-end bg-white" },
                h.div(
                    { class: "d-flex align-items-center justify-content-between gap-4" },
                    h.div(
                        h.a(
                            {
                                class: "btn btn-outline-secondary text-uppercase",
                                style: "--bs-btn-active-bg: var(--bs-btn-bg); --bs-btn-hover-bg: var(--bs-btn-bg); --bs-btn-active-color: var(--bs-btn-color); --bs-btn-hover-color: var(--bs-btn-color); --bs-btn-border-color: var(--bs-white); --bs-btn-active-border-color: var(--bs-btn-border-color); --bs-btn-hover-border-color: var(--bs-btn-border-color);",
                                href: "./sign-up.html",
                                title: "Go to Sign in page"
                            },
                            h.span({ class: "fs-sm" }, "Skip")
                        )),
                    h.div(
                        h.div(
                            { class: "carousel-indicators align-items-center position-static gap-1 m-0" },
                            h.button({
                                type: "button",
                                data_bs_target: "#onboardingCarousel",
                                data_bs_slide_to: "0",
                                class: "active",
                                aria_current: "true",
                                aria_label: "Onboarding Slide 1"
                            }),
                            h.button({
                                type: "button",
                                data_bs_target: "#onboardingCarousel",
                                data_bs_slide_to: "1",
                                aria_label: "Onboarding Slide 2"
                            }),
                            h.button({
                                type: "button",
                                data_bs_target: "#onboardingCarousel",
                                data_bs_slide_to: "2",
                                aria_label: "Onboarding Slide 3"
                            })
                        )),
                    h.div(
                        h.button(
                            {
                                onclick: this.method("next"),
                                type: "button",
                                class: "btn btn-primary square rounded-ca",
                                title: "Go to next slide or Page"
                                // data_bs_target: "#onboardingCarousel",
                                // data_bs_slide: "next"
                            },
                            h.i({ class: "fa-solid fa-arrow-right" })
                        )
                    )
                )
            ),
            ...args
        );
    }

    next() {
        if (!this.isLastItemActive()) {
            this.instance.next();
            return;
        }
        // Logic here!
        console.log("Navigating to next page!");
    }

    togglePlayPause() {
        /* Recommended. https://getbootstrap.com/docs/5.3/components/carousel/#autoplaying-carousels */
        const _isCycling = this.isCycling.value;
        this.isCycling.value = !_isCycling;
        if (_isCycling) { this.instance.pause(); }
        else { this.instance.cycle(); }
    }

    get carousel() { return dom.id("onboardingCarousel"); }
    get instance() { return bootstrap.Carousel.getInstance(this.carousel); }
    get items() { return dom.all(".carousel-item", this.carousel); }
    get activeItem() { return dom.get(".carousel-item.active", this.carousel); }
    get itemCount() { return this.items.length; }
    get currentIndex() { return Array.from(this.items).indexOf(this.activeItem); }
    isFirstItemActive() { return this.currentIndex == 0; }
    isLastItemActive() { return this.itemCount - 1 == this.currentIndex; }
}

class OnboardingCarouselItem extends OpenScript.Component {
    render(title, subtitle, ...args) {
        return h.div(
            { class: "carousel-item h-100" },
            h.div(
                {
                    class: "card h-100 border-0",
                    style: "--bs-card-border-radius: 0; --bs-card-cap-bg: var(--bs-card-bg);"
                },
                h.div({ class: "card-header border-0" }),
                h.div(
                    { class: "card-body overflow-y-auto" },
                    h.div({ style: "height: 300px" }),
                    h.div(
                        { class: "px-2 pt-3 text-start" },
                        h.h2({ class: "heading-lg pb-2", title: title }, title),
                        h.p({ title: subtitle }, subtitle)
                    )
                ),
                h.div({ class: "card-footer border-0" })
            ),
            ...args
        );
    }
}