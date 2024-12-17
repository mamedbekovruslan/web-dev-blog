import { Icon } from '../../../../components';
import { useDispatch } from 'react-redux';
import { TableRow } from '../table-row/table-row';
// import { ROLE } from '../../../../constants';
import styled from 'styled-components';

const UserRowContainer = ({ className, login, registeredAt, roleId: userRoleId }) => {
  const dispatch = useDispatch();

  const roles = [];

  const onRoleChange = () => {};

  return (
    <div className={className}>
      <div className="user-data">
        <div className="login-column">{login}</div>
        <div className="registered-at-column">{registeredAt}</div>
        <div className="role-column">
          <select value={userRoleId} onChange={onRoleChange}>
            {roles.map(({ id: roleId, name: roleName }) => (
              <option value={roleId}>{roleName}</option>
            ))}
          </select>
          <Icon
            id="fa-floppy-o"
            marign="0 0 0 10px"
            onClick={() => dispatch(/* TODO */)}
          />
        </div>
      </div>
      <Icon id="fa-trash-o" marign="0 0 0 10px" onClick={() => dispatch(/* TODO */)} />
    </div>
  );
};

export const UserRow = styled(UserRowContainer)``;
