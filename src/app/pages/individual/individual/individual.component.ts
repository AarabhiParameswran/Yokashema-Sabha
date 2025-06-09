// individual.component.ts
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { MemberService } from 'src/app/core/services/member.service';

interface MemberDetails {
  addr_2: string;
  age: number;
  personal_id: number;
  dc_year: string;
  addr_3: string;
  job: string;
  us_apd: string;
  whatsapp_number: string;
  district: string;
  member_type: number;
  jilla_apd: string;
  email: string;
  name: string;
  pincode: number;
  live: string;
  state_apd: string;
  renewal: string;
  phone: string;
  upasabha_code: number;
  cro_apd: string;
  district_code: number;
  house: string;
  member_id: number;
  mobile_number: number;
  locked: string;
  sex: string;
  blood_group: number;
  addr_1: string;
  dob: string;
  ref_id: number;
  displayName?: string; // For ng-select display
}

interface FamilyRelation {
  memberId: number;
  familyMemberId: number;
  relation: string;
}

@Component({
  selector: 'app-individual',
  standalone: true,
  imports: [CommonModule, FormsModule, NgSelectModule],
  templateUrl: './individual.component.html',
  styleUrl: './individual.component.css'
})
export class IndividualComponent implements OnInit {
  @ViewChild('addFamilyModal') addFamilyModal!: TemplateRef<any>;
  
  memberDetails: MemberDetails | null = null;
  allMembers: MemberDetails[] = [];
  filteredMembers: MemberDetails[] = [];
  loading = false;
  error: string | null = null;
  
  // Modal state
  isModalOpen = false;
  modalLoading = false;
  modalError: string | null = null;
  
  // Form fields for ng-select
  selectedFamilyMember: number | null = null;
  familyRelation: string = '';
  searchTerm: string = '';
  
  // Relationship suggestions
  relationSuggestions = [
    'Father', 'Mother', 'Spouse', 'Husband', 'Wife', 
    'Son', 'Daughter', 'Brother', 'Sister', 
    'Grandfather', 'Grandmother', 'Uncle', 'Aunt',
    'Cousin', 'Nephew', 'Niece', 'Father-in-law', 
    'Mother-in-law', 'Son-in-law', 'Daughter-in-law',
    'Brother-in-law', 'Sister-in-law'
  ];

  constructor(
    private memberService: MemberService
  ) {}

  ngOnInit() {
    this.loadMemberDetails(3.10017); // Using the example member_id
    this.loadAllMembers();
  }

  loadMemberDetails(memberId: number) {
    this.loading = true;
    this.error = null;

    this.memberService.getMemberDetails(memberId).subscribe({
      next: (data) => {
        this.memberDetails = data;
        this.loading = false;
        this.prepareFilteredMembers();
      },
      error: (err) => {
        this.error = 'Failed to load member details';
        this.loading = false;
        console.error('Error loading member details:', err);
      }
    });
  }

  loadAllMembers() {
    this.memberService.getAllMembers().subscribe({
      next: (data) => {
        this.allMembers = data;
        this.prepareFilteredMembers();
      },
      error: (err) => {
        console.error('Error loading all members:', err);
      }
    });
  }

  prepareFilteredMembers() {
    if (!this.memberDetails || !this.allMembers.length) return;
    
    // Filter out the current member and prepare display names
    this.filteredMembers = this.allMembers
      .filter(member => member.member_id !== this.memberDetails!.member_id)
      .map(member => ({
        ...member,
        displayName: `${member.name} (ID: ${member.member_id})`
      }));
  }

  getBloodGroupName(bloodGroup: number): string {
    const bloodGroups: { [key: number]: string } = {
      1: 'A+', 2: 'A-', 3: 'B+', 4: 'B-',
      5: 'AB+', 6: 'AB-', 7: 'O+', 8: 'O-', 9: 'Unknown'
    };
    return bloodGroups[bloodGroup] || 'Unknown';
  }

  getMemberTypeName(type: number): string {
    const memberTypes: { [key: number]: string } = {
      1: 'Regular', 2: 'Premium', 3: 'Life Member'
    };
    return memberTypes[type] || 'Unknown';
  }

  onAddFamily() {
    this.isModalOpen = true;
    this.resetModalForm();
    this.modalError = null;
  }

  closeModal() {
    this.isModalOpen = false;
    this.modalError = null;
    this.resetModalForm();
  }

  resetModalForm() {
    this.selectedFamilyMember = null;
    this.familyRelation = '';
    this.searchTerm = '';
  }

  selectRelationSuggestion(suggestion: string) {
    this.familyRelation = suggestion;
  }

  onSubmitFamily() {
    // Validate form
    if (!this.selectedFamilyMember || !this.familyRelation.trim()) {
      this.modalError = 'Please select a family member and enter the relationship';
      return;
    }

    if (!this.memberDetails) {
      this.modalError = 'Current member data not available';
      return;
    }

    // Create family relation object
    const familyRelationData: FamilyRelation = {
      memberId: this.memberDetails.member_id,
      familyMemberId: this.selectedFamilyMember,
      relation: this.familyRelation.trim()
    };

    console.log('Submitting family relation:', familyRelationData);

    this.modalLoading = true;
    this.modalError = null;

    this.memberService.addFamilyMember(familyRelationData).subscribe({
      next: (response) => {
        console.log('Family member added successfully:', response);
        this.modalLoading = false;
        this.closeModal();
        this.showSuccessMessage();
      },
      error: (err) => {
        this.modalError = 'Failed to add family member. Please try again.';
        this.modalLoading = false;
        console.error('Error adding family member:', err);
      }
    });
  }

  showSuccessMessage() {
    console.log('Family member relationship added successfully!');
  }

  getMemberName(memberId: number): string {
    const member = this.allMembers.find(m => m.member_id === memberId);
    return member ? member.name : 'Unknown';
  }

  getSelectedFamilyMemberDetails(): MemberDetails | null {
    if (!this.selectedFamilyMember) return null;
    return this.filteredMembers.find(m => m.member_id === this.selectedFamilyMember) || null;
  }
}