import Time "mo:core/Time";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Array "mo:core/Array";
import List "mo:core/List";
import Int "mo:core/Int";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // Types

  type ServiceType = {
    #aadharCardNew;
    #aadharCardUpdate;
    #aadharCardDownload;
    #panCardNew;
    #panCardUpdate;
    #voterIdNew;
    #voterIdUpdate;
    #rationCardNew;
    #rationCardUpdate;
    #bankAccountOpening;
    #pmgScheme;
    #otherGovernmentSchemes;
    #identityCardApplication;
    #identityCardUpdate;
  };

  type InquiryStatus = {
    #pending;
    #inProgress;
    #completed;
    #cancelled;
  };

  type Inquiry = {
    id : Nat;
    name : Text;
    phone : Text;
    service : ServiceType;
    status : InquiryStatus;
    timestamp : Time.Time;
  };

  type InquiryInput = {
    name : Text;
    phone : Text;
    service : ServiceType;
  };

  module Inquiry {
    public func compareByTimestamp(inquiry1 : Inquiry, inquiry2 : Inquiry) : Order.Order {
      Int.compare(inquiry1.timestamp, inquiry2.timestamp);
    };
  };

  // State
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  let inquiries = Map.empty<Nat, Inquiry>();
  var nextInquiryId = 0;

  // Helper Functions

  func getNextInquiryId() : Nat {
    let currentId = nextInquiryId;
    nextInquiryId += 1;
    currentId;
  };

  func getInquiryInternal(id : Nat) : Inquiry {
    switch (inquiries.get(id)) {
      case (null) { Runtime.trap("Inquiry does not exist") };
      case (?inquiry) { inquiry };
    };
  };

  // Public Functions (Admin & Public Access)

  // Submit new inquiry (public, no auth required)
  public shared func submitInquiry(input : InquiryInput) : async Nat {
    let newId = getNextInquiryId();
    let newInquiry : Inquiry = {
      id = newId;
      name = input.name;
      phone = input.phone;
      service = input.service;
      status = #pending;
      timestamp = Time.now();
    };
    inquiries.add(newId, newInquiry);
    newId;
  };

  // Get all inquiries (admin only)
  public query ({ caller }) func getAllInquiries() : async [Inquiry] {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can view all inquiries");
    };
    inquiries.values().toArray().sort(Inquiry.compareByTimestamp);
  };

  // Get inquiry by id (admin only)
  public query ({ caller }) func getInquiryById(id : Nat) : async Inquiry {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can view inquiries");
    };
    getInquiryInternal(id);
  };

  // Update inquiry status (admin only)
  public shared ({ caller }) func updateInquiryStatus(id : Nat, status : InquiryStatus) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can update statuses");
    };
    let inquiry = getInquiryInternal(id);
    let updatedInquiry : Inquiry = {
      id = inquiry.id;
      name = inquiry.name;
      phone = inquiry.phone;
      service = inquiry.service;
      status;
      timestamp = inquiry.timestamp;
    };
    inquiries.add(id, updatedInquiry);
  };

  // Delete inquiry (admin only)
  public shared ({ caller }) func deleteInquiry(id : Nat) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can delete inquiries");
    };
    if (not inquiries.containsKey(id)) {
      Runtime.trap("Inquiry does not exist");
    };
    inquiries.remove(id);
  };

  // Helper function to filter inquiries by status
  func getInquiriesByStatusInternal(status : InquiryStatus) : [Inquiry] {
    let filteredInquiries = List.empty<Inquiry>();
    for (inquiry in inquiries.values()) {
      if (inquiry.status == status) {
        filteredInquiries.add(inquiry);
      };
    };
    filteredInquiries.toArray();
  };

  // Get inquiries by status (admin only)
  public query ({ caller }) func getInquiriesByStatus(status : InquiryStatus) : async [Inquiry] {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can view inquiries by status");
    };
    getInquiriesByStatusInternal(status);
  };
};
