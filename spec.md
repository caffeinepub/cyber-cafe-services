# Cyber Cafe Services - Vinay Gautam

## Current State
A Cyber Cafe government services website with:
- Navbar, HeroSection, ServicesSection (7 service cards), ContactSection (inquiry form + admin login), Footer
- Backend with inquiry submission and admin management
- Placeholder contact info (fake address/phone)
- Services: Aadhar, PAN, Voter ID, Ration Card, Bank Account, Government Schemes, Identity Card

## Requested Changes (Diff)

### Add
- Driving Licence service with link to parivahan.gov.in
- Passport service with link to passportindia.gov.in
- Caste Certificate service with link to edistrict.up.gov.in
- Birth Certificate service with link to crsorgi.gov.in
- MSME / Udyam Certificate service with link to udyamregistration.gov.in
- PM Yojana (all schemes) service with link to pmmodiyojana.in
- Each service card gets an "Official Website" button that opens the government site in a new tab
- Owner name "Vinay Gautam" displayed in the footer and hero as proprietor
- Appointment booking section to emphasize the contact/booking form

### Modify
- Footer address: Bilaspur, Greater Noida, Gautam Buddh Nagar
- Footer phone: 8384821357
- Navbar brand: show "Vinay Gautam" cyber cafe identity
- Hero subtext: mention owner Vinay Gautam
- ContactSection dropdown: add all new service types
- ServicesSection: add new service cards with official external links per card
- HeroSection service badges: update to reflect broader services

### Remove
- Placeholder/fake address, phone number

## Implementation Plan
1. Update Navbar: brand to include owner identity
2. Update HeroSection: updated cards and contact info reference
3. Update ServicesSection: add Driving Licence, Passport, Caste Certificate, Birth Certificate, MSME/Udyam, PM Yojana cards, each with official website link button
4. Update ContactSection: add new service options to select dropdown
5. Update Footer: real address, phone, owner name
