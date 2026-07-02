# Policy Info Page Memory

- The Policy Info page is the main insurance policy directory view.
- It renders a search/filter panel, a policy table, and a floating add button.
- The floating add button calls the local state setter to open the policy creation dialog.
- The add flow is controlled by the page-level state `isDialogOpen`, which is toggled from `false` to `true` when the add button is clicked.
- The page passes the current `clients`, `insuranceCompanies`, `brokers`, and `onSave` callback into `PolicyUpsertDialog`.
- `PolicyUpsertDialog` is a wrapper around `InsurancePolicyForm` and renders it inside an MUI `Dialog`.
- The dialog closes through `handleInternalClose`, which resets the form state and then calls the parent `onClose` callback.
- `InsurancePolicyForm` owns the actual policy creation experience and is split into two tabs: General and Detail.
- The general tab collects core policy information such as client, insurance company, broker, policy number, quotation number, effective date, expiry date, and premium.
- The detail tab collects vehicle-specific information such as registration number, vehicle type, engine/chassis details, and manufacturer/model metadata.
- Saving the form validates both form sections and then calls the optional `onSave` callback with a payload containing:
  - `insuranceGeneralInformation`
  - `vehiclePolicyDetailInformation`
- The current implementation is a create-oriented flow. It initializes with fresh default values and does not yet appear to support editing an existing policy by pre-filling the dialog.
- This page is currently wired for creating a new insurance policy from the add action, while the table displays the existing policies from the parent props.
