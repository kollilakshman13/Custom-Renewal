import {d, b as p, o as s, i as c, f as o, e as i, h as u, G as f, n, B as m, q as y, aa as h} from "./index-a95a3bd9.js";
import {I as k} from "./iconify-c88ef0fb.js";
const E = d({
    __name: "SidebarLink",
    props: {
        icon: {},
        label: {},
        isExpanded: {
            type: Boolean
        },
        isActive: {
            type: Boolean,
            default: !1
        },
        onClick: {
            type: Function,
            default: () => () => !0
        },
        to: {
            default: ""
        }
    },
    setup(t) {
        const a = t
          , r = p();
        function l() {
            a.onClick(),
            a.to && r.push({
                name: a.to
            })
        }
        return (e, g) => (s(),
        c("div", {
            class: n(["-all flex h-7 cursor-pointer items-center rounded pl-2 pr-1 text-gray-800 duration-300 ease-in-out", {
                "w-full": e.isExpanded,
                "w-8": !e.isExpanded,
                "shadow-sm": e.isActive,
                "bg-white": e.isActive,
                "hover:bg-gray-100": !e.isActive
            }]),
            onClick: l
        }, [o("span", {
            class: n(["shrink-0 text-gray-700", {
                "text-gray-900": !e.isExpanded
            }])
        }, [typeof e.icon == "string" ? (s(),
        i(u(k), {
            key: 0,
            icon: e.icon,
            class: "h-4 w-4"
        }, null, 8, ["icon"])) : (s(),
        i(f(e.icon), {
            key: 1,
            class: "h-4 w-4"
        }))], 2), o("div", {
            class: n(["-all ml-2 flex shrink-0 grow items-center justify-between text-sm duration-300 ease-in-out", {
                "opacity-100": e.isExpanded,
                "opacity-0": !e.isExpanded,
                "-z-50": !e.isExpanded
            }])
        }, [m(y(e.label) + " ", 1), h(e.$slots, "right")], 2)], 2))
    }
});
export {E as _};
//# sourceMappingURL=SidebarLink.vue_vue_type_script_setup_true_lang-9e824e0a.js.map
