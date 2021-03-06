import * as React from "react";
import { injectIntl } from "react-intl";
import { useSelector } from "react-redux";

import { AppContext } from "../../../AppContext";
import { getGenerationData } from "../../../store/userSelection/app/selector";
import { ILicenseObject } from "../../../types/license";
import { getAllLicenses } from "../../../utils/extensionService/extensionService";
import styles from "./styles.module.css";

const Licenses = () => {
  const { vscode } = React.useContext(AppContext);
  const generationData = useSelector(getGenerationData);
  const [licenses, setLicenses] = React.useState<ILicenseObject[]>([]);
  React.useEffect(() => {
    getAllLicenses(generationData, vscode).then((event) => {
      setLicenses(event.data.payload.licenses);
    });
  }, []);

  return (
    <div className={styles.container}>
      <ul>
        {licenses.map((license: ILicenseObject) => (
          <li key={license.url}>
            <a
              className={styles.licenseButton}
              href={String(license.url)}
              key={license.text}
              target={"_blank"}
              rel="noreferrer noopener"
            >
              {license.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default injectIntl(Licenses);
