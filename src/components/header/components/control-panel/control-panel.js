import { Button, Icon } from '../../../../components';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { ROLE } from '../../../../constants';
import {
  selectUserRole,
  selectUserLogin,
  selectUserSession,
} from '../../../../selectors';
import { logout } from '../../../../actions/logout';

const RightAligned = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  width: 100px;
  height: 32px;
  border: 1px solid #000;
  background-color: #eee;
`;

const StyledIcon = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

const StyledLogoutIcon = styled.div`
  margin: 0 0 10px 10px;

  &:hover {
    cursor: pointer;
  }
`;

const UserName = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const ControlPanelContainer = ({ className }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const roleId = useSelector(selectUserRole);
  const login = useSelector(selectUserLogin);
  const session = useSelector(selectUserSession);

  return (
    <div className={{ className }}>
      <RightAligned>
        {roleId === ROLE.GUEST ? (
          <Button>
            <Link to="/login">Войти</Link>
          </Button>
        ) : (
          <>
            <UserName>{login}</UserName>
            <StyledIcon>
              <Icon
                id="fa-sign-out"
                margin="0 0 0 10px"
                onClick={() => dispatch(logout(session))}
              />
            </StyledIcon>
          </>
        )}
      </RightAligned>
      <RightAligned>
        <StyledIcon href="" onClick={() => navigate(-1)}>
          <Icon id="fa-backward" margin="10px 0 0 0" />
        </StyledIcon>
        <Link to="/post">
          <Icon id="fa-file-text-o" margin="10px 0 0 16px" />
        </Link>
        <Link to="/users">
          <Icon id="fa-users" margin="10px 0 0 17px" />
        </Link>
      </RightAligned>
    </div>
  );
};

export const ControlPanel = styled(ControlPanelContainer)``;
