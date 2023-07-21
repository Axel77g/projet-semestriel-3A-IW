import Component from "../../core/Component.js";

export default class AboutUs extends Component {
  render() {
    return createElement(
      "div",
      {
        class: [
          "container",
          "d-flex",
          "justify-content-center",
          "align-items-center",
          "min-vw-100",
          "min-vh-100",
          "max-vw-100",
          "max-vh-100",
        ],
      },
      [
        createElement(
          "div",
          {
            class: [
              "container",
              "d-flex",
              "flex-column",
              "w-50",
              "mh-100",
              "overflow-y-auto",
              "border",
              "rounded",
              "border-2",
              "p-5",
            ],
          },
          [
            createElement(
              "h1",
              { class: ["text-center", "w-100"] },
              "About Us"
            ),

            createElement(
              "p",
              { class: ["text-center", "w-100"] },
              "At Our Company, we are passionate about delivering exceptional products and services to meet your needs. With years of experience in the industry, we have built a strong reputation for excellence and reliability."
            ),

            createElement(
              "p",
              { class: ["text-center", "w-100"] },
              "Our mission is to provide innovative solutions that empower our clients and drive their success. We understand that each customer is unique, and we take the time to listen and understand your specific requirements. Whether you're a small startup or a large enterprise, we are committed to tailoring our offerings to match your goals."
            ),

            createElement(
              "p",
              { class: ["text-center", "w-100"] },
              "What sets us apart is our dedicated team of professionals who are experts in their respective fields. From our skilled engineers to our talented designers and customer support specialists, we work together to ensure that every aspect of your experience with us exceeds your expectations. We believe in open communication, collaboration, and transparency, ensuring that you are involved and informed every step of the way."
            ),

            createElement(
              "p",
              { class: ["text-center", "w-100"] },
              "Quality is at the core of everything we do. We strive for excellence in every project, from the smallest task to the most complex undertaking. Our commitment to quality extends not only to our products and services but also to our customer relationships. We aim to build long-lasting partnerships based on trust, integrity, and mutual success."
            ),

            createElement(
              "p",
              { class: ["text-center", "w-100"] },
              "We are constantly evolving and staying ahead of the curve to provide you with the latest advancements and technologies. Our team regularly undergoes training and development to ensure that we deliver cutting-edge solutions that keep you at the forefront of your industry."
            ),

            createElement(
              "p",
              { class: ["text-center", "w-100"] },
              "Thank you for considering Our Company as your trusted partner. We look forward to working with you and helping you achieve your goals. Feel free to reach out to us with any inquiries or to discuss how we can assist you further."
            ),

            createElement(
              "p",
              { class: ["text-center", "w-100"] },
              "Together, let's embark on a journey of innovation, collaboration, and growth."
            ),

            createElement(
              "p",
              { class: ["text-center", "w-100"] },
              "Sincerely,"
            ),

            createElement(
              "p",
              { class: ["text-center", "w-100"] },
              "The Our Company Team"
            ),
          ]
        ),
      ]
    );
  }
}
