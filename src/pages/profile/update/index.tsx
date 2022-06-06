import React from "react";
import { FixedHead } from "../../../components";
import { WithAuth } from "../../../global-hoc";
import { Header } from "../../../page-components/home";
import { FieldsUser } from "../../../page-components/profile";
import styles from "../../../page-components/profile/Profile.module.scss";

const ProfileUpdate: React.FC = WithAuth(() => {
  return (
    <div className={styles.profile}>
      <FixedHead title="Perfil" />
      <Header />
      <FieldsUser isUpdate />
    </div>
  );
});

export default ProfileUpdate;
