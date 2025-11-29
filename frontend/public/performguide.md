<!-- performance guide -->

* when passing function,events props to child-parent components remember to memoize it for preventing re-renders
* don't make inline functions in jsx eg: onClick={() => setClick(true)}

# use react-tracked library for performance analzyation of usestate

* use Activity component for rendering heavy component in background

* when sending formData use axios.putForm,patchForm
* use React.memo() when component will be static most of the time
* use (this) when using passed props in components or functions