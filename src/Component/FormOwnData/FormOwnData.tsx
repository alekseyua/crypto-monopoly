import React from "react";
import cls from "./styles/form-own-data.module.css";
import { IconCamera, icons } from "../../assets";
import Icon from "../../shared/UI/Icon/Icon";
import { IUser } from "../../store/users/user";
import { Input } from "../../shared/UI";

interface FormOwnDataProps {
  error:{[key:string]: string};
  infoUser?: IUser;
  isInputNumber: boolean;
  handleChangeAvatar: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddPhoneOwnInfo: (source: string) => void;
  setPhoneNumber: (v: string) => void;
}

const FormOwnData: React.FC<FormOwnDataProps> = ({
  error,
  infoUser,
  isInputNumber,
  setPhoneNumber,
  handleChangeAvatar,
  handleAddPhoneOwnInfo,
}) => {
  return (
    <div className={cls.containerOwnCard}>
      {infoUser && Object.keys(infoUser).length ? (
        <>
          <div className={cls.conAvatar}>
            <input
              onChange={handleChangeAvatar}
              type="file"
              accept="image/*"
              style={{
                width: "100%",
                opacity: 0,
                height: "100%",
                position: "absolute",
                zIndex: 10,
              }}
            />
            {!infoUser.photo ? (
              <Icon
                src={IconCamera}
                style={{ zIndex: 9, position: "relative" }}
              />
            ) : (
              <img src={infoUser.photo} alt="avatar" />
            )}
          </div>

          <div className={cls.containerFormInfoUser}>
            <div className={cls.formshowInfoUser}>
              {infoUser.username}
              <span>Никнейм</span>
            </div>
            <div className={cls.formshowInfoUser}>
              {infoUser.email}
              <span>Почта</span>
            </div>
            {isInputNumber ? (
              <Input
                id="phone_number"
                type="number"
                style={{
                  padding: 10,
                }}
                errorText={error?.phone_number}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setPhoneNumber(event.target.value)
                }
                iconRight={
                  <Icon
                    src={icons.success}
                    width="35"
                    height="35"
                    style={{
                      position: "absolute",
                      right: 5,
                    }}
                    onClick={() => handleAddPhoneOwnInfo("set_phone")}
                  />
                }
              />
            ) : (
              <div
                onClick={
                  infoUser.phone_number
                    ? undefined
                    : () => handleAddPhoneOwnInfo("input_phone")
                }
                className={cls.formshowInfoUserPhone}
              >
                {infoUser.phone_number || "указать номер телефона"}
              </div>
            )}
          </div>

          {/* <div className={cls.infoHowJoinService}>
            {infoUser.amount_day && (
              <span dangerouslySetInnerHTML={{ __html: infoUser.amount_day }} />
            )}
          </div> */}
        </>
      ) : (
        <>Loading ...</>
      )}
    </div>
  );
};

export default FormOwnData;
