/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { PROPOSAL_PENDING, SUCCESS } from "app/utils/Constants";
import MaterialTableCustom from "app/components/MaterialTableCustom/MaterialTableCustom";
import { getProposalByCurrentLeader } from "app/services/ProposalServices";
import PendingDialog from "../PendingDialog";
import ColumnsProposal from "app/components/ColumnsCusTom/ColumnsProposal";

export const PendingProposal = (props) => {
  const { listProposal } = props;
  const type = "proposal";
  const [OpenDialogPending, setOpenDialogPending] = useState(false);
  const [employeeId, setEmployeeId] = useState({});
  const [proposal, setProposal] = useState({});
  const [Proposals, setProposals] = useState([]);
  useEffect(() => {
    handleGetProposalByCurrentLeader();
  }, [listProposal]);

  const handleOpenPendingDialog = (data) => {
    setProposal(data);
    setEmployeeId(data?.employeeId);
    setOpenDialogPending(true);
  };

  const handleClosePendingDialog = () => {
    setOpenDialogPending(false);
  };

  const handleGetProposalByCurrentLeader = async () => {
    const res = await getProposalByCurrentLeader();
    if (res?.data?.code === SUCCESS) {
      setProposals(res?.data?.data);
    }
  };

  const columns = ColumnsProposal({
    status: PROPOSAL_PENDING,
    handleOpenPendingDialog: handleOpenPendingDialog,
  });

  return (
    <div className="m-sm-30" style={{ marginBottom: "10px" }}>
      <MaterialTableCustom
        title={" Danh sách chờ duyệt đề xuất tham mưu"}
        columns={columns}
        data={Proposals}
        height={"550px"}
        search={true}
        paging={true}
      />
      {OpenDialogPending && (
        <PendingDialog
          OpenDialogPending={OpenDialogPending}
          handleClosePendingDialog={handleClosePendingDialog}
          employeeId={employeeId}
          type={type}
          proposal={proposal}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  listProposal: state.proposal.listProposal,
});

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(PendingProposal);
