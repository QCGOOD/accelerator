<template>
  <div>
    <UserCount/>
    <UserDashboard/>
    <Qc/>
  </div>
</template>

<script>
import UserCount from "./UserCount";
import UserDashboard from "./UserDashboard";

export default {
  components: {
    UserCount,
    UserDashboard
  },
};
</script>