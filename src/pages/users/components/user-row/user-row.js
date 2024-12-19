import { Icon } from '../../../../components';
import { useDispatch } from 'react-redux';
// import { ROLE } from '../../../../constants';
import styled from 'styled-components';
import { TableRow } from '../table-row/table-row';

const UserRowContainer = ({
  className,
  login,
  registeredAt,
  roles,
  roleId: userRoleId,
}) => {
  const dispatch = useDispatch();

  const onRoleChange = () => {};
  console.log(login);

  return (
    <div className={className}>
      <TableRow border>
        <div className="login-column">{login}</div>
        <div className="registered-at-column">{registeredAt}</div>
        <div className="role-column">
          <select value={userRoleId} onChange={onRoleChange}>
            {roles.map(({ id: roleId, name: roleName }) => (
              <option key={roleId} value={roleId}>
                {roleName}
              </option>
            ))}
          </select>
          <Icon
            id="fa-floppy-o"
            marign="0 0 0 10px"
            padding="0 0 0 10px"
            onClick={() => dispatch(/* TODO */)}
          />
        </div>
      </TableRow>
      <Icon
        id="fa-trash-o"
        marign="0 0 0 10px"
        padding="0 0 0 10px"
        onClick={() => dispatch(/* TODO */)}
      />
    </div>
  );
};

export const UserRow = styled(UserRowContainer)`
  display: flex;
  margin-top: 10px;
`;
