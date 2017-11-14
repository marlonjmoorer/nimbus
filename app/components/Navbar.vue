<template>
  <div>
    <ul id="dropdown1" class="dropdown-content">
    <li><a href="#!">one</a></li>
    <li><a href="#!">two</a></li>
    <li class="divider"></li>
    <li><a href="#!">three</a></li>
    </ul>
    <nav class="light-blue darken-1">
    <div class="nav-wrapper">
        <a href="#!" class="brand-logo">Logo</a>
        <ul class="right hide-on-med-and-down">
        <li><router-link to="/signup">Signup</router-link></li>
        <li><a href="badges.html">Components</a></li>
        <!-- Dropdown Trigger -->
        <li><a class="dropdown-button" href="#!" data-activates="dropdown1">Dropdown<i class="material-icons right">arrow_drop_down</i></a></li>
        </ul>
    </div>
    </nav>
  </div>
</template>

<script>
export default {};
</script>

<style>

</style>
