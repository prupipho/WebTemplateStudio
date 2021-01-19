import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { injectIntl, InjectedIntlProps } from "react-intl";

import { openAzureServicesModalAction } from "../../../store/navigation/modals/action";
import { hasSelectedService } from "../../../store/userSelection/services/servicesSelector";
import { isLoggedInSelector } from "../../../store/config/azure/selector";
import { setDetailPageAction } from "../../../store/config/detailsPage/action";
import { AppState } from "../../../store/combineReducers";

import { ROUTE } from "../../../utils/constants/constants";

import Icon from "../../../components/Icon";

import { ReactComponent as PriceSVG } from "../../../assets/money.svg";
import { ReactComponent as TimeSVG } from "../../../assets/timer.svg";

import buttonStyles from "../../../css/button.module.css";
import styles from "./styles.module.css";
import messages from "./messages";
import InputTitle from "../../../components/Titles/TitleForInput";

interface IProps {
  service: IService;
}

type Props = IProps & InjectedIntlProps;

export const ServiceCard = (props: Props) => {
  const { intl, service } = props;
  const { formatMessage } = intl;
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(isLoggedInSelector);
  const hasService = useSelector((state: AppState) => hasSelectedService(state, service.internalName));

  const showDetails = () => {
    dispatch(setDetailPageAction(service, false, ROUTE.ADD_SERVICES));
  };

  const openModal = () => {
    isLoggedIn && service.openModalAction
      ? dispatch(service.openModalAction)
      : dispatch(openAzureServicesModalAction(service.internalName));
  };

  return (
    <div className={styles.container}>
      <div className={styles.cardContainer}>
        <div className={styles.header}>
          <Icon name={service.title} icon={service.icon} />
          <InputTitle>{service.title}</InputTitle>
        </div>
        <div className={styles.body}>
          {service.expectedPrice && (
            <div className={styles.expectedPrice}>
              <PriceSVG className={styles.svg} />
              <div>{formatMessage(service.expectedPrice)}</div>
            </div>
          )}
          {service.expectedTime && (
            <div className={styles.expectedTime}>
              <TimeSVG className={styles.svg} />
              <div>{formatMessage(service.expectedTime)}</div>
            </div>
          )}
          <div>{service.body}</div>
        </div>
        <div className={styles.footer}>
          <button tabIndex={0} onClick={showDetails} className={buttonStyles.buttonLink}>
            {formatMessage(messages.learnMore)}
          </button>
          <button
            onClick={openModal}
            className={buttonStyles.buttonHighlighted}
            tabIndex={0}
          >
            {hasService ? formatMessage(messages.editResource) : formatMessage(messages.addToProject)}
          </button>
        </div>
      </div>
    </div>
  );
};

export default injectIntl(ServiceCard);
