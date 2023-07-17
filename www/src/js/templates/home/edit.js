import Component from "../../core/Component.js";
import FilePicker from "../../components/ui/FilePicker.js";
import Input from "../../components/ui/Input.js";
import WYSIWYG from "../../components/ui/WYSIWYG.js";
import Button from "../../components/ui/Button.js";
import HomeAction from "../../components/home/BannerAction.js";
import Switch from "../../components/ui/Switch.js";
import Select from "../../components/ui/Select.js";
import Social from "../../components/home/Social.js";

export class HomeEdit extends Component {
  init() {
    this.state = {
      banner: this.props?.initialContent?.banner || {
        title: "",
        subtitle: "",
        actions: [],
        file_banner: null,
      },

      articles_section: this.props?.initialContent?.articles_section || {
        enabled: true,
        type: "latest",
      },

      about_section_content:
        this.props?.initialContent?.about_section_content || "",

      contact_section: this.props?.initialContent?.contact_section || {
        email: "",
        phone: "",
        address: "",
        socials: [],
      },
      errors: {},
    };
  }

  get content() {
    return {
      banner: {
        title: this.state.banner?.title ?? "",
        subtitle: this.state.banner?.subtitle ?? "",
        actions: this.state.banner?.actions ?? [],
        file_banner: this.state.banner?.file_banner?.id ?? null,
      },
      contact_section: {
        email: this.state.contact_section?.email ?? "",
        phone: this.state.contact_section?.phone ?? "",
        address: this.state.contact_section?.address ?? "",
        socials:
          this.state.contact_section?.socials.map((social) => ({
            file_icon: social.file_icon?.id,
            url: social.url,
          })) ?? [],
      },
      articles_section: {
        enabled: this.state.articles_section?.enabled ?? false,
        type: this.state.articles_section?.type ?? "latest",
      },
      about_section_content: this.state.about_section_content ?? "",
    };
  }

  onAskContent(callable) {
    const content = this.content;
    if (!this.check(content)) return callable(new Error("Invalid content"));
    callable(content);
  }

  check(content) {
    let errors = {};
    if (content.banner.file_banner === null) {
      errors = {
        ...errors,
        banner: {
          ...errors?.banner,
          file_banner: ["Veuillez choisir une image de banière"],
        },
      };
    }

    this.setState({ errors });
    return !Boolean(Object.keys(errors).length);
  }

  render() {
    return createElement("div", { class: "mt-4" }, [
      createElement("div", { class: "home-edit-section" }, [
        createElement("h4", {}, "Banière"),
        createElement("div", { class: "form-row" }, [
          createElement(Input, {
            name: "banner_title",
            placeholder: "Titre banière",
            onChange: ({ value }) => {
              this.setState({
                banner: {
                  ...this.state.banner,
                  title: value,
                },
              });
            },
            value: this.state.banner.title,
          }),
          createElement(Input, {
            name: "banner_subtitle",
            placeholder: "Sous-titre banière",
            onChange: ({ value }) => {
              this.setState({
                banner: {
                  ...this.state.banner,
                  subtitle: value,
                },
              });
            },
            value: this.state.banner.subtitle,
          }),
        ]),
        createElement("div", { class: "form-row" }, [
          createElement(FilePicker, {
            id: "banner_input",
            placeholder: "Image de banière",
            onChange: (file) => {
              this.setState({
                banner: {
                  ...this.state.banner,
                  file_banner: file,
                },
              });
            },
            value: this.state.banner.file_banner,
            accept: "image/*",
            message: this.state.errors?.banner?.file_banner,
          }),
        ]),
        createElement("div", { class: "form-row" }, [
          createElement("div", { class: "actions" }, [
            createElement("h4", {}, "Actions banière"),
            ...this.state.banner?.actions?.map((action, index) => {
              return createElement(HomeAction, {
                action,
                key: "banner-action-" + index,
                onChange: ({ value, name }) => {
                  this.setState({
                    banner: {
                      ...this.state.banner,
                      actions: this.state.banner?.actions?.map((action, i) => {
                        if (i === index) {
                          return { ...action, [name]: value };
                        }
                        return action;
                      }),
                    },
                  });
                },
                onDelete: () => {
                  this.setState({
                    banner: {
                      ...this.state.banner,
                      actions: this.state.banner?.actions?.filter(
                        (_, i) => i !== index
                      ),
                    },
                  });
                },
              });
            }),
          ]),
        ]),
        createElement("div", { class: "form-row" }, [
          createElement(Button, {
            key: "banner-action-add",
            onClick: () => {
              this.setState({
                banner: {
                  ...this.state.banner,
                  actions: [
                    ...this.state.banner?.actions,
                    { label: "", url: "" },
                  ],
                },
              });
            },
            children: "Ajouter une action",
          }),
        ]),
      ]),
      createElement("hr", {}),
      createElement("div", { class: "home-edit-section" }, [
        createElement("h4", {}, "Rubrique à propos"),
        createElement(WYSIWYG, {
          name: "about_section_content",
          placeholder: "Contenu rubrique à propos",
          value: this.state.about_section_content,
        }),
      ]),
      createElement("hr", {}),
      createElement("div", { class: "home-edit-section" }, [
        createElement("h4", {}, "Article à la une"),
        createElement("div", { class: "form-row" }, [
          createElement(Switch, {
            name: "article_enabled",
            label: "Activer les articles à la une",
            checked: this.state.articles_section.enabled,
            onChange: (e) => {
              this.setState({
                articles_section: {
                  ...this.state.articles_section,
                  enabled: e.checked,
                },
              });
            },
            placeholder: "Activer les articles à la une",
          }),
          createElement(Select, {
            name: "article_type",
            placeholder: "Comportement des articles à la une",
            value: this.state.articles_section.type,
            onChange: (e) => {
              this.setState({
                articles_section: {
                  ...this.state.articles_section,
                  type: e.value,
                },
              });
            },
            options: [
              {
                value: "latest",
                label: "Derniers articles",
              },
              {
                value: "random",
                label: "Articles aléatoires",
              },
              {
                value: "popular",
                label: "Articles les plus populaires",
              },
            ],
          }),
        ]),
      ]),
      createElement("hr", {}),
      createElement("div", { class: "home-edit-section" }, [
        createElement("h4", {}, "Rubrique contact"),
        createElement("div", { class: "form-row" }, [
          createElement(Input, {
            name: "contact_email",
            placeholder: "Email de contact",
            value: this.state.contact_section.email,
            onChange: ({ value }) => {
              this.setState({
                contact_section: {
                  ...this.state.contact_section,
                  email: value,
                },
              });
            },
          }),
          createElement(Input, {
            name: "contact_phone",
            placeholder: "Téléphone de contact",
            value: this.state.contact_section.phone,
            onChange: ({ value }) => {
              this.setState({
                contact_section: {
                  ...this.state.contact_section,
                  phone: value,
                },
              });
            },
          }),
        ]),
        createElement("div", { class: "form-row" }, [
          createElement(Input, {
            name: "contact_address",
            placeholder: "Adresse de contact",
            value: this.state.contact_section.address,
            onChange: ({ value }) => {
              this.setState({
                contact_section: {
                  ...this.state.contact_section,
                  address: value,
                },
              });
            },
          }),
        ]),
        createElement("div", { class: "form-row" }, [
          createElement("div", { class: "socials" }, [
            createElement("h4", {}, "Réseaux sociaux"),
            ...this.state.contact_section?.socials?.map((social, index) => {
              return createElement(Social, {
                key: "social-" + index,
                social,
                onChange: ({ value, name }) => {
                  this.setState({
                    contact_section: {
                      ...this.state.contact_section,
                      socials: this.state.contact_section?.socials?.map(
                        (social, i) => {
                          if (i === index) {
                            return { ...social, [name]: value };
                          }
                          return social;
                        }
                      ),
                    },
                  });
                },
                onDelete: () => {
                  this.setState({
                    contact_section: {
                      ...this.state.contact_section,
                      socials: this.state.contact_section?.socials?.filter(
                        (_, i) => i !== index
                      ),
                    },
                  });
                },
              });
            }),
          ]),
        ]),
        createElement("div", { class: "form-row" }, [
          createElement(Button, {
            key: "social-add",
            children: "Ajouter un réseau social",
            onClick: () => {
              this.setState({
                contact_section: {
                  ...this.state.contact_section,
                  socials: [
                    ...this.state.contact_section?.socials,
                    { file_icon: "", url: "" },
                  ],
                },
              });
            },
          }),
        ]),
      ]),
    ]);
  }
}
