document.addEventListener("DOMContentLoaded", () => {
  // Handle form submissions
  const contactForm = document.getElementById("contact-form")
  const footerContactForm = document.getElementById("footer-contact-form")

  if (contactForm) {
    contactForm.addEventListener("submit", handleFormSubmit)
  }

  if (footerContactForm) {
    footerContactForm.addEventListener("submit", handleFormSubmit)
  }

  function handleFormSubmit(e) {
    e.preventDefault()

    const email = e.target.querySelector('input[type="email"]').value
    const message = e.target.querySelector("textarea").value
    const formData = new FormData()
    formData.append("email", email)
    formData.append("message", message)
    formData.append("_subject", "New Quote Request from YipWorks Website")
    formData.append("_template", "table")

    fetch("https://formspree.io/f/mgedqzpp", {
        method: "POST",
        body: formData,
        headers: {
            "Accept": "application/json"
        }
    })
    .then(response => {
        if (response.ok) {
            // Show success message
            const formContainer = e.target.parentElement
            const successMessage = document.createElement("div")
            successMessage.className = "success-message"
            successMessage.textContent = "Thank you! We'll be in touch soon."
            successMessage.style.color = "#10b981"
            successMessage.style.marginTop = "15px"
            successMessage.style.fontWeight = "500"

            // Remove any existing success messages
            const existingMessage = formContainer.querySelector(".success-message")
            if (existingMessage) {
                formContainer.removeChild(existingMessage)
            }

            formContainer.appendChild(successMessage)
            e.target.reset()
        } else {
            throw new Error("Form submission failed")
        }
    })
    .catch(error => {
        console.error("Error:", error)
        const formContainer = e.target.parentElement
        const errorMessage = document.createElement("div")
        errorMessage.className = "error-message"
        errorMessage.textContent = "Sorry, there was an error submitting your request. Please try again later."
        errorMessage.style.color = "#ef4444"
        errorMessage.style.marginTop = "15px"
        errorMessage.style.fontWeight = "500"

        const existingMessage = formContainer.querySelector(".error-message")
        if (existingMessage) {
            formContainer.removeChild(existingMessage)
        }

        formContainer.appendChild(errorMessage)
    })
  }

  // Smooth scrolling for navigation
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: "smooth",
        })
      }
    })
  })
})
